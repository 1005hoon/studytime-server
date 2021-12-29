import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("group_master", { schema: "studytime" })
export class GroupMaster {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("datetime", { name: "created_at" })
  createdAt: Date;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "leader_id", length: 20 })
  leaderId: string;

  @Column("tinyint", { name: "is_public", width: 1 })
  isPublic: boolean;

  @Column("varchar", { name: "password", length: 6 })
  password: string;

  @Column("int", { name: "goal_time" })
  goalTime: number;

  @Column("int", { name: "avg_time" })
  avgTime: number;

  @Column("int", { name: "max_member" })
  maxMember: number;

  @Column("int", { name: "team_id" })
  teamId: number;

  @Column("tinyint", { name: "is_deleted", width: 1 })
  isDeleted: boolean;

  @Column("longtext", { name: "notice_msg" })
  noticeMsg: string;

  @Column("varchar", { name: "color", length: 10 })
  color: string;

  @Column("varchar", { name: "group_description", length: 100 })
  groupDescription: string;

  @Column("tinyint", { name: "is_hot", width: 1 })
  isHot: boolean;

  @Column("int", { name: "last_attend_count" })
  lastAttendCount: number;

  @Column("int", { name: "last_member_count" })
  lastMemberCount: number;

  @Column("int", { name: "last_post_count" })
  lastPostCount: number;
}
