ALTER TABLE "listMembers" RENAME COLUMN "id" TO "listId";--> statement-breakpoint
ALTER TABLE "listMembers" DROP CONSTRAINT "listMembers_id_lists_id_fk";
--> statement-breakpoint
ALTER TABLE "listMembers" ADD CONSTRAINT "listMembers_listId_lists_id_fk" FOREIGN KEY ("listId") REFERENCES "public"."lists"("id") ON DELETE cascade ON UPDATE no action;