import { ActivatedRoute } from '@angular/router';

// Use for page in sub module;
export function extractBaseSegment(path: string, activeRoute: ActivatedRoute) {
  const currentRouteSegments = activeRoute.snapshot.pathFromRoot
    .map((segment) => segment.url.map((urlSegment) => urlSegment.path))
    .reduce((acc, segments) => acc.concat(segments), []);

  const indexOfQueryPath = currentRouteSegments.indexOf(path);
  if (indexOfQueryPath !== -1) {
    const baseSegment = currentRouteSegments.slice(0, indexOfQueryPath);
    return baseSegment;
  } else {
    return currentRouteSegments;
  }
}
