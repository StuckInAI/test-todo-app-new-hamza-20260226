import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  task: string

  @Column({ type: 'text', default: 'Health & Fitness' })
  category: string

  @Column({ type: 'boolean', default: false })
  completed: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}