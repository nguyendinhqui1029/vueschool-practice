export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Board {
    id: string;
    title: string;
    tasks: Task[];
}

