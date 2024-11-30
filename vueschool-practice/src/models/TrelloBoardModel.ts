export interface Task {
    id: string;
    title: string;
    isEdit?: boolean;
    isNew?: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Board {
    id?: string;
    isEdit?: boolean;
    title: string;
    tasks: Task[];
}

