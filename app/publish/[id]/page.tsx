import CodeViewer from "@/components/code-viewer";
import { cache, Suspense } from "react";
import { db } from "@/db";
import Loading from "../loading";


export default async function Page({params }: {params: Promise<{ id: string }>}) {
  const { id } = await params
  const generatedApp = await getGeneratedAppByID(id);

  if (!generatedApp) {
    return <div>App not found</div>;
  }

  return(
    <Suspense fallback={<Loading />}>
        <div className="h-full w-full">
            <CodeViewer code={generatedApp.code} />
        </div>
    </Suspense>
  );
}

const getGeneratedAppByID = cache(async (id: string) => {
  return db.componentBuild.findUnique({
    where: {
      id,
    },
  });
});
