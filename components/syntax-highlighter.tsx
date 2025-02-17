"use client";

import { use } from "react";
import { createHighlighter } from "shiki/bundle/web";

const highlighterPromise = createHighlighter({
  langs: [
    "html",
    "css",
    "js",
    "graphql",
    "javascript",
    "json",
    "jsx",
    "markdown",
    "md",
    "mdx",
    "plaintext",
    "text",
    "ts",
    "tsx",
    "txt",
    "typescript",
    "zsh",
  ],
  themes: ["github-light-default"],
});

export default function SyntaxHighlighter({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const highlighter = use(highlighterPromise);
  const html = highlighter.codeToHtml(code, {
    lang: language,
    theme: "github-light-default",
  });

  return (
    <div className="p-4 text-sm  overflow-y-auto bg-white h-[80vh] overflow-auto" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
