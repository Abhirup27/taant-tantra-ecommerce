import {
  Entity,
  Column,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "users", schema: "auth" })
export class AuthUser {
  @PrimaryColumn("uuid")
  id!: string;

  @Column("uuid", { name: "instance_id", nullable: true })
  instanceId!: string | null;

  @Column("varchar", { length: 255, nullable: true })
  aud!: string | null;

  @Column("varchar", { length: 255, nullable: true })
  role!: string | null;

  @Column("varchar", { length: 255, nullable: true })
  email!: string | null;

  @Column("varchar", { length: 255, name: "encrypted_password", nullable: true })
  encryptedPassword!: string | null;

  @Column("timestamptz", { name: "email_confirmed_at", nullable: true })
  emailConfirmedAt!: Date | null;

  @Column("timestamptz", { name: "invited_at", nullable: true })
  invitedAt!: Date | null;

  @Column("varchar", { length: 255, name: "confirmation_token", nullable: true })
  confirmationToken!: string | null;

  @Column("timestamptz", { name: "confirmation_sent_at", nullable: true })
  confirmationSentAt!: Date | null;

  @Column("varchar", { length: 255, name: "recovery_token", nullable: true })
  recoveryToken!: string | null;

  @Column("timestamptz", { name: "recovery_sent_at", nullable: true })
  recoverySentAt!: Date | null;

  @Column("varchar", { length: 255, name: "email_change_token_new", nullable: true })
  emailChangeTokenNew!: string | null;

  @Column("varchar", { length: 255, name: "email_change", nullable: true })
  emailChange!: string | null;

  @Column("timestamptz", { name: "email_change_sent_at", nullable: true })
  emailChangeSentAt!: Date | null;

  @Column("timestamptz", { name: "last_sign_in_at", nullable: true })
  lastSignInAt!: Date | null;

  @Column("jsonb", { name: "raw_app_meta_data", nullable: true })
  rawAppMetaData!: Record<string, any> | null;

  @Column("jsonb", { name: "raw_user_meta_data", nullable: true })
  rawUserMetaData!: Record<string, any> | null;

  @Column("boolean", { name: "is_super_admin", nullable: true })
  isSuperAdmin!: boolean | null;

  @Column("timestamptz", { name: "created_at", nullable: true })
  createdAt!: Date | null;

  @Column("timestamptz", { name: "updated_at", nullable: true })
  updatedAt!: Date | null;

  @Column("text", { name: "phone", nullable: true })
  phone!: string | null;

  @Column("timestamptz", { name: "phone_confirmed_at", nullable: true })
  phoneConfirmedAt!: Date | null;

  @Column("text", { name: "phone_change", nullable: true })
  phoneChange!: string | null;

  @Column("varchar", { length: 255, name: "phone_change_token", nullable: true })
  phoneChangeToken!: string | null;

  @Column("timestamptz", { name: "phone_change_sent_at", nullable: true })
  phoneChangeSentAt!: Date | null;

  @Column("timestamptz", { name: "confirmed_at", nullable: true })
  confirmedAt!: Date | null;

  @Column("varchar", { length: 255, name: "email_change_token_current", nullable: true })
  emailChangeTokenCurrent!: string | null;

  @Column("smallint", { name: "email_change_confirm_status", nullable: true })
  emailChangeConfirmStatus!: number | null;

  @Column("timestamptz", { name: "banned_until", nullable: true })
  bannedUntil!: Date | null;

  @Column("varchar", { length: 255, name: "reauthentication_token", nullable: true })
  reauthenticationToken!: string | null;

  @Column("timestamptz", { name: "reauthentication_sent_at", nullable: true })
  reauthenticationSentAt!: Date | null;

  @Column("boolean", { name: "is_sso_user", default: false })
  isSsoUser!: boolean;

  @Column("timestamptz", { name: "deleted_at", nullable: true })
  deletedAt!: Date | null;

  @Column("boolean", { name: "is_anonymous", default: false })
  isAnonymous!: boolean;
}

