export type Notification = {
    to: string;
    title: string;
    body: string;
    data: {
        url: string;
    };
};
