export class Category {
    categoryId: number;
    description: string;

    constructor(description?: string, categoryId?: number) {
        this.description = description;
        this.categoryId = categoryId;
    }
}