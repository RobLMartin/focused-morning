import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";
import { ClientOnly } from "remix-utils";
import Editor from "../components/editor/index.client";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  const journal = await db.journal.findUnique({
    where: { id: "7689f01d-cb03-4f85-9a78-9ca081948013" },
    include: {
      user: true,
    },
  });

  if (!journal) return json({ journal: null }, { status: 200 });

  return json({ journal });
};

export default function Index() {
  const { journal } = useLoaderData();
  return (
    <div>
      <ClientOnly>
        {() => {
          return (
            <Editor record={journal} action={`/api/article/${journal.id}`} />
          );
        }}
      </ClientOnly>
    </div>
  );
}
