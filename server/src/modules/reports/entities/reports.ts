export interface Reports {
    id: number;

    title: string;

    data: {
        heading: string;

        paragraph: string;
    }[];

    author: string;

    createdAt: Date;

    updatedAt?: Date;

    deletedAt?: Date;
}