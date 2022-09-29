export type AuthForm = {
  email: string,
  password: string
}

export type CreateTask = {
  id: number,
  title: string,
  description?: string | null
  createdAt: Date
}

export type EditedTask = {
  id: number,
  title: string,
  description?: string | null
}