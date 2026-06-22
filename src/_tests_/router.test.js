import { describe, it, expect } from 'vitest';
import { router } from '../router';

describe('Router', () => {
  it('should have defined routes', () => {
    expect(router).toBeDefined();
    expect(router.routes).toBeDefined();
    expect(router.routes.length).toBeGreaterThan(0);
  });

  it('should have main layout as root route', () => {
    const mainRoute = router.routes[0];
    expect(mainRoute.path).toBe('/');
    expect(mainRoute.children).toBeDefined();
  });

  it('should have MVP routes', () => {
    const mainRoute = router.routes[0];
    const paths = mainRoute.children.map((r) => r.path || 'index');
    expect(paths).toContain('index'); // /
    expect(paths).toContain('poke');
    expect(paths).toContain('panino');
    expect(paths).toContain('ricette');
    expect(paths).toContain('carrello');
    expect(paths).toContain('ordine/:id');
  });
});
