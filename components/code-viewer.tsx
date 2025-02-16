"use client";

import * as ShadcnUiComponent from "@/lib/shadcnui"
import {
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react/unstyled";
import dedent from "dedent";


export default function CodeViewer({
  code,
}: {
  code: string
}) {
  return(
    <SandpackProvider
      key={code}
      template="react-ts"
      className="relative h-full w-full [&_.sp-preview-container]:flex [&_.sp-preview-container]:h-full [&_.sp-preview-container]:w-full [&_.sp-preview-container]:grow [&_.sp-preview-container]:flex-col [&_.sp-preview-container]:justify-center [&_.sp-preview-iframe]:grow"
      files={{
        "App.tsx": code,
        ...ShadcnUiFiles,
        "/tsconfig.json": {
          code: `{
            "include": [
              "./**/*"
            ],
            "compilerOptions": {
              "strict": true,
              "esModuleInterop": true,
              "lib": [ "dom", "es2015" ],
              "jsx": "react-jsx",
              "baseUrl": "./",
              "paths": {
                "@/components/*": ["components/*"]
              }
            }
          }
        `,
        },
      }}
      options={{
        externalResources: [
          "https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
        ],
      }}
      // {...sharedProps}
      customSetup={
        {
          dependencies: {
            "lucide-react": "latest",
            recharts: "2.9.0",
            "react-router-dom": "latest",
            "framer-motion": "latest",
            "react-icons": "latest",
            "axios": "latest",
            "@heroicons/react": "latest",
            "@radix-ui/react-accordion": "^1.2.0",
            "@radix-ui/react-alert-dialog": "^1.1.1",
            "@radix-ui/react-aspect-ratio": "^1.1.0",
            "@radix-ui/react-avatar": "^1.1.0",
            "@radix-ui/react-checkbox": "^1.1.1",
            "@radix-ui/react-collapsible": "^1.1.0",
            "@radix-ui/react-dialog": "^1.1.1",
            "@radix-ui/react-dropdown-menu": "^2.1.1",
            "@radix-ui/react-hover-card": "^1.1.1",
            "@radix-ui/react-label": "^2.1.0",
            "@radix-ui/react-menubar": "^1.1.1",
            "@radix-ui/react-navigation-menu": "^1.2.0",
            "@radix-ui/react-popover": "^1.1.1",
            "@radix-ui/react-progress": "^1.1.0",
            "@radix-ui/react-radio-group": "^1.2.0",
            "@radix-ui/react-select": "^2.1.1",
            "@radix-ui/react-separator": "^1.1.0",
            "@radix-ui/react-slider": "^1.2.0",
            "@radix-ui/react-slot": "^1.1.0",
            "@radix-ui/react-switch": "^1.1.0",
            "@radix-ui/react-tabs": "^1.1.0",
            "@radix-ui/react-toast": "^1.2.1",
            "@radix-ui/react-toggle": "^1.1.0",
            "@radix-ui/react-toggle-group": "^1.1.0",
            "@radix-ui/react-tooltip": "^1.1.2",
            "class-variance-authority": "^0.7.0",
            clsx: "^2.1.1",
            "date-fns": "^3.6.0",
            "embla-carousel-react": "^8.1.8",
            "react-day-picker": "^8.10.1",
            "tailwind-merge": "^2.4.0",
            "tailwindcss-animate": "^1.0.7",
            vaul: "^0.9.1",
          },
        }
      }
    >
      <SandpackPreview
        showNavigator={false}
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        showRestartButton={false}
        showOpenNewtab={false}
        className="h-full w-full"
      />
    </SandpackProvider>
  )
}

const ShadcnUiFiles = {
  "/lib/utils.ts": ShadcnUiComponent.utils,
  "/components/ui/accordion.tsx": ShadcnUiComponent.accordian,
  "/components/ui/alert-dialog.tsx": ShadcnUiComponent.alertDialog,
  "/components/ui/alert.tsx": ShadcnUiComponent.alert,
  "/components/ui/avatar.tsx": ShadcnUiComponent.avatar,
  "/components/ui/badge.tsx": ShadcnUiComponent.badge,
  "/components/ui/breadcrumb.tsx": ShadcnUiComponent.breadcrumb,
  "/components/ui/button.tsx": ShadcnUiComponent.button,
  "/components/ui/calendar.tsx": ShadcnUiComponent.calendar,
  "/components/ui/card.tsx": ShadcnUiComponent.card,
  "/components/ui/carousel.tsx": ShadcnUiComponent.carousel,
  "/components/ui/checkbox.tsx": ShadcnUiComponent.checkbox,
  "/components/ui/collapsible.tsx": ShadcnUiComponent.collapsible,
  "/components/ui/dialog.tsx": ShadcnUiComponent.dialog,
  "/components/ui/drawer.tsx": ShadcnUiComponent.drawer,
  "/components/ui/dropdown-menu.tsx": ShadcnUiComponent.dropdownMenu,
  "/components/ui/input.tsx": ShadcnUiComponent.input,
  "/components/ui/label.tsx": ShadcnUiComponent.label,
  "/components/ui/menubar.tsx": ShadcnUiComponent.menuBar,
  "/components/ui/navigation-menu.tsx": ShadcnUiComponent.navigationMenu,
  "/components/ui/pagination.tsx": ShadcnUiComponent.pagination,
  "/components/ui/popover.tsx": ShadcnUiComponent.popover,
  "/components/ui/progress.tsx": ShadcnUiComponent.progress,
  "/components/ui/radio-group.tsx": ShadcnUiComponent.radioGroup,
  "/components/ui/select.tsx": ShadcnUiComponent.select,
  "/components/ui/separator.tsx": ShadcnUiComponent.separator,
  "/components/ui/skeleton.tsx": ShadcnUiComponent.skeleton,
  "/components/ui/slider.tsx": ShadcnUiComponent.slider,
  "/components/ui/switch.tsx": ShadcnUiComponent.switchComponent,
  "/components/ui/table.tsx": ShadcnUiComponent.table,
  "/components/ui/tabs.tsx": ShadcnUiComponent.tabs,
  "/components/ui/textarea.tsx": ShadcnUiComponent.textarea,
  "/components/ui/toast.tsx": ShadcnUiComponent.toast,
  "/components/ui/toaster.tsx": ShadcnUiComponent.toaster,
  "/components/ui/toggle-group.tsx": ShadcnUiComponent.toggleGroup,
  "/components/ui/toggle.tsx": ShadcnUiComponent.toggle,
  "/components/ui/tooltip.tsx": ShadcnUiComponent.tooltip,
  "/components/ui/use-toast.tsx": ShadcnUiComponent.useToast,
  "/components/ui/index.tsx": `
  export * from "./button"
  export * from "./card"
  export * from "./input"
  export * from "./label"
  export * from "./select"
  export * from "./textarea"
  export * from "./avatar"
  export * from "./radio-group"
  `,
  "/public/index.html": dedent`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `,
};