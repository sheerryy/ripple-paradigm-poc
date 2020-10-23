export interface Reports {
    id: string;

    title: string;

    data: {
        heading: string;

        paragraph: string;
    }[];

    authorId: string;

    createdAt: Date;

    updatedAt?: Date;

    deletedAt?: Date;
}