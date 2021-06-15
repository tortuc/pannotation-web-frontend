import { Observable, Subscriber } from 'rxjs';

export class FilesHelper {
    public static dataUrlToBlob(dataUrl: string): Blob {
        const parts: string[] = dataUrl.split(',');
        const mimeType: string = parts[0].match(/:(.*?);/)[1];

        const decodedString: string = atob(parts[1]);

        let n: number = decodedString.length;
        const bitArray: Uint8Array = new Uint8Array(n);

        while (n--) {
            bitArray[n] = decodedString.charCodeAt(n);
        }

        return new Blob([bitArray], {type: mimeType});
    }

    public static arrayBufferToBlob(array: Uint8Array): Blob {
        return new Blob([array.buffer as ArrayBuffer]);
    }

    public static blobToArrayBuffer(blob: Blob): Observable<ArrayBuffer> {
        return new Observable((subscriber: Subscriber<ArrayBuffer>) => {
            const fileReader: FileReader = new FileReader();

            fileReader.onload = () => {
                subscriber.next(fileReader.result as ArrayBuffer);
                subscriber.complete();
            };

            fileReader.readAsArrayBuffer(blob);
        });
    }

    static getDataURLFromFile(file: File): Observable<string> {
        return new Observable((observer) => {
            const reader: FileReader = new FileReader();
            if (reader.error) {
                observer.error(reader.error);
                observer.complete();
            }
            reader.onload = (): void => {
                observer.next(reader.result as string);
                observer.complete();
            };
            reader.readAsDataURL(file);
        });
    }

    static dataUrlToFile(dataUrl: string, fileName = 'file.png'): File {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type: mime});
    }

    static getFilenameFromUrl(url: string): string {
        const matches = url.match(/\/([^\/?#]+)[^\/]*$/);
        if (matches.length > 1) {
            return matches[1];
        }
        return null;
    }
}
