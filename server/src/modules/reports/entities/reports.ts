export interface Reports {
    id: number;

    title: string;

    data: {
        heading: string;

        paragraph: string;
    }[];

    authorId: number;

    createdAt: Date;

    updatedAt?: Date;

    deletedAt?: Date;
}