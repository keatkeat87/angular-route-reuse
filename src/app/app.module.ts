import { RouteReuseComponent } from './interface';
import { AboutComponent } from './about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { ComponentRef } from '@angular/core/src/render3';
import { ViewportScroller } from '@angular/common';
import { TeacherModule } from './teacher/teacher.module';


interface Cache {
  route: ActivatedRouteSnapshot;
  detachedTree: DetachedRouteHandle & DetachedRouteHandleLike;
  scrollTop: number
}
interface DetachedRouteHandleLike {
  componentRef: ComponentRef<RouteReuseComponent>
}

@Injectable()
export class DefaultRouteReuseStrategy implements RouteReuseStrategy {

  constructor(
    private viewportScroller: ViewportScroller,
  ) { }

  private caches: Cache[] = [];
  private compareRouteFromRoot(aRoutes: ActivatedRouteSnapshot[], bRoutes: ActivatedRouteSnapshot[]): boolean {
    if (aRoutes.length !== bRoutes.length) return false;
    return aRoutes.every((aRoute, index) => {
      const bRoute = bRoutes[index];
      const equal = aRoute.routeConfig === bRoute.routeConfig;
      if (!equal) return false;
      const paramMapKey = aRoute.data.paramMapKey;
      if (paramMapKey) {
        return aRoute.paramMap.get(paramMapKey) === bRoute.paramMap.get(paramMapKey);
      } else {
        return true;
      }
    });
  }
  private isSameRoute(a: ActivatedRouteSnapshot, b: ActivatedRouteSnapshot) {
    return this.compareRouteFromRoot(a.pathFromRoot, b.pathFromRoot);
  }

  private findCache(route: ActivatedRouteSnapshot): Cache | undefined {
    const caches = this.caches.filter(cache => this.isSameRoute(cache.route, route));
    if (caches.length > 1) {
      console.log('route reuse cache more than 1 !!!');
    }
    else if (caches.length === 0) {
      return undefined;
    }
    else {
      return caches[0];
    }
  }
  private beforeRoute: ActivatedRouteSnapshot;
  private prevScrollTop: number;

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const result = !!route.data.reuse;
    // console.log('shouldDetach', 'route', route.data.name, 'return', result);
    this.prevScrollTop = this.viewportScroller.getScrollPosition()[1];
    return result;
  }

  store(route: ActivatedRouteSnapshot, detachedTree: (DetachedRouteHandle & DetachedRouteHandleLike) | null): void {

    if (detachedTree !== null) {
      let cache = this.findCache(route);
      if (cache === undefined) {
        cache = { route, detachedTree, scrollTop: 0 };
        console.log('store new', route.data.name);
        this.caches.push(cache);
        if (this.caches.length > 20) {
          console.log('route reuse cache more than 20, take care oh', this.caches);
        }
      }
      // 这里需要更新 detachedTree, 因为 child 是会改变的.
      // 比如 a.b -> b.z 这时 cache a.b 
      // 然后 b.z -> a.b -> a.c -> b.z 这里 a 就发生了 re-cache
      // 第一次 cache 是 a.b, 但现在 cache a.c 
      // 所以我们要更新 cache 
      cache.detachedTree = detachedTree;
      cache.scrollTop = this.prevScrollTop;
      cache.detachedTree.componentRef.instance.onDetach();
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.log('shouldAttach', this.viewportScroller.getScrollPosition());
    const cache = this.findCache(route);
    const result = !!route.data.reuse && !!cache;
    if (result) {
      cache.detachedTree.componentRef.instance.onAttach();
      Promise.resolve().then(() => {
        this.viewportScroller.scrollToPosition([0, cache.scrollTop]);
      });
    }
    console.log('shouldAttach', 'route', route.data.name, 'return', result ? route.data.name + ' 旧' : route.data.name + ' 新');
    // note : 
    // 一个 component 被 buang 掉, 其下的 cache 也 buang
    if (this.beforeRoute.data.reuse !== true) {
      const removeCaches: Cache[] = [];
      this.caches = this.caches.filter(cache => {
        const cachePaths = cache.route.pathFromRoot;
        const beforePaths = this.beforeRoute.pathFromRoot;
        // 估计使用 > 也可以，不需要 >=
        if (cachePaths.length >= beforePaths.length) {
          const match = beforePaths.every((bp, index) => this.isSameRoute(bp, cachePaths[index]));
          if (match) {
            removeCaches.push(cache);
            return false;
          }
        }
        return true;
      });
      if (removeCaches.length > 0) {
        removeCaches.forEach(cache => cache.detachedTree.componentRef.destroy());
      }
    }
    return result;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // console.log('retrieve', this.viewportScroller.getScrollPosition());
    let result = null;
    if (route.data.reuse) {
      const cache = this.findCache(route);
      if (cache) {
        result = cache.detachedTree;
      }
    }
    // console.log('retrieve', 'route', route.data.name, 'return', result);
    return result;
  }

  shouldReuseRoute(before: ActivatedRouteSnapshot, after: ActivatedRouteSnapshot): boolean {
    this.beforeRoute = before;
    const result = this.isSameRoute(before, after);
    // console.log('shouldReuseRoute', 'before', before.data.name, 'after', after.data.name, 'return', result ? after.data.name + ' 留' : after.data.name + ' 换');
    return result;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TeacherModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: DefaultRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
