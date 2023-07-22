interface IUpdateUserRequestDTO {
  userId: string;
  id: string;
  title: string;
  description: string;
  done: boolean;
  arquived: boolean;
}

export { IUpdateUserRequestDTO };
