import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CafeCategory } from './cafe-category.entity';
import { CafeReply } from './cafe-reply.entity';

@Index(
  'cafe_article_category_id_b2587133_fk_cafe_category_id',
  ['categoryId'],
  {},
)
@Entity('cafe_article', { schema: 'studytime' })
export class CafeArticle {
  constructor(partial?: Partial<CafeArticle>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 500 })
  title: string;

  @Column('longtext', { name: 'contents' })
  contents: string;

  @Column('varchar', { name: 'st_id', length: 20 })
  stId: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('longtext', { name: 'location' })
  location: string;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('tinyint', { name: 'is_notice', width: 1 })
  isNotice: boolean;

  @Column('tinyint', { name: 'is_hot', width: 1 })
  isHot: boolean;

  @Column('tinyint', { name: 'is_deleted', width: 1 })
  isDeleted: boolean;

  @Column('int', { name: 'category_id' })
  categoryId: number;

  @Column('longtext', { name: 'image_url', nullable: true })
  imageUrl: string | null;

  @Column('longtext', { name: 'user_thumbnail' })
  userThumbnail: string;

  @ManyToOne(() => CafeCategory, (cafeCategory) => cafeCategory.cafeArticles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: CafeCategory;

  @OneToMany(() => CafeReply, (cafeReply) => cafeReply.article)
  cafeReplies: CafeReply[];
}
