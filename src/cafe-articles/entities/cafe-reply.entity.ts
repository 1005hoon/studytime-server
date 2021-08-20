import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CafeArticle } from './cafe-article.entity';

@Index('cafe_reply_article_id_e12fed68_fk_cafe_article_id', ['articleId'], {})
@Entity('cafe_reply', { schema: 'studytime' })
export class CafeReply {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('longtext', { name: 'contents' })
  contents: string;

  @Column('varchar', { name: 'st_id', length: 20 })
  stId: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'target_nickname', nullable: true, length: 30 })
  targetNickname: string | null;

  @Column('int', { name: 'depth' })
  depth: number;

  @Column('datetime', { name: 'created_at' })
  createdAt: Date;

  @Column('datetime', { name: 'updated_at' })
  updatedAt: Date;

  @Column('tinyint', { name: 'is_picked', width: 1 })
  isPicked: boolean;

  @Column('tinyint', { name: 'is_deleted', width: 1 })
  isDeleted: boolean;

  @Column('int', { name: 'target_id', nullable: true })
  targetId: number | null;

  @Column('int', { name: 'article_id', nullable: true })
  articleId: number | null;

  @Column('longtext', { name: 'user_thumbnail' })
  userThumbnail: string;

  @ManyToOne(() => CafeArticle, (cafeArticle) => cafeArticle.cafeReplies, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'article_id', referencedColumnName: 'id' }])
  article: CafeArticle;
}
