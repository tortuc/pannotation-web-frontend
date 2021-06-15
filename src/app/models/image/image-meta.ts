export interface ImageMeta {
    formData: {
        ['Content-Type']: string;
        acl: string;
        key: string;
        ['X-Amz-Signature']: string;
        Policy: string;
        ['X-Amz-Date']: string;
        ['X-Amz-Credential']: string;
        ['X-Amz-Algorithm']: string;
    };
    url: string;
}
