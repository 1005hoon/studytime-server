import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("group_post", { schema: "studytime" })
export class GroupPost {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("int", { name: "group_id" })
  groupId: number;

  @Column("longtext", { name: "content" })
  content: string;

  @Column("varchar", { name: "color", length: 10 })
  color: string;

  @Column("varchar", { name: "font_color", length: 10 })
  fontColor: string;

  @Column("int", { name: "post_id" })
  postId: number;

  @Column("varchar", { name: "st_id", length: 20 })
  stId: string;

  @Column("tinyint", { name: "is_deleted", width: 1 })
  isDeleted: boolean;

  @Column("tinyint", { name: "is_nickname_showed", width: 1 })
  isNicknameShowed: boolean;

  @Column("varchar", { name: "nickname", length: 30 })
  nickname: string;
}
