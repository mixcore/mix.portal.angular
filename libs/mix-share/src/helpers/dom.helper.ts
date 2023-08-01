export class DomHelper {
  public static downloadFile(fileName: string, filePath: string) {
    const link = document.createElement('a');
    link.setAttribute('download', fileName);
    link.href = filePath;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
