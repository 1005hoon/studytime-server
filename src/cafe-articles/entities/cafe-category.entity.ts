import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CafeArticle } from './cafe-article.entity';

@Entity('cafe_category', { schema: 'studytime' })
export class CafeCategory {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { name: 'type', length: 10 })
  type: string;

  @OneToMany(() => CafeArticle, (cafeArticle) => cafeArticle.category)
  cafeArticles: CafeArticle[];
}
