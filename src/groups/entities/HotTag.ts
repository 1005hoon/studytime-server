import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("hot_tag", { schema: "studytime" })
export class HotTag {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "group_id" })
  groupId: number;

  @Column("int", { name: "tag_id" })
  tagId: number;

  @Column("varchar", { name: "name", length: 20 })
  name: string;

  @Column("int", { name: "team_id" })
  teamId: number;
}
