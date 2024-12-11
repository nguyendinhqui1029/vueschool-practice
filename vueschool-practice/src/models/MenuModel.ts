export interface MenuResponseValue {
    title: string;
    id: string;
    parentId: string;
}

export interface MenuRequestBody {
  id?: string;
	title: string;
  parentId: string | null;
}
export interface Post {
    id?: string;
    title: string;
    isEdit?: boolean;
}

export interface Topic {
    id?: string;
    groupName: string;
    isEdit?: boolean;
    posts: Post[];
};