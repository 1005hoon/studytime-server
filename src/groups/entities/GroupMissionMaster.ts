import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("group_mission_master", { schema: "studytime" })
export class GroupMissionMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("int", { name: "group_id" })
  groupId: number;

  @Column("longtext", { name: "content" })
  content: string;

  @Column("varchar", { name: "title", length: 128 })
  title: string;
}
