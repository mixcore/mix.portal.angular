export class DomHelper {
  public static downloadFile(fileName: string, filePath: string) {
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.href = filePath;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  public static decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  public static getCurrentPathname() {
    const baseHref = new URL(document.baseURI).pathname;
    const currentPath = window.location.pathname + window.location.search;
    if (!baseHref || baseHref === '/') return currentPath;

    return currentPath.replace(baseHref, '');
  }
}
