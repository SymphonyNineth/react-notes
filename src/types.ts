export interface ITag {
  id: string;
  label: string;
}

export interface INoteData {
  title: string;
  markdown: string;
  tags: ITag[];
}

export interface INote extends INoteData {
  id: string;
}

export type RawNoteData = Omit<INoteData, 'tags'> & { tagIds: string[] };

export interface IRawNote extends RawNoteData {
  id: string;
}
