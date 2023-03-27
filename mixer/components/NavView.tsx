import { IconMoonFilled, IconSun } from "@tabler/icons-react";
import { getVersion, getName } from "@tauri-apps/api/app";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ThemeCtx } from "./Providers/ThemeProvider";

type AppInfo = {
  name: string;
  version: string;
}

export default function NavView() {
  const [appInfo, setAppInfo] = useState<AppInfo>({ name: "Zen.FM Mixer", version: "1.0.0" })
  const { theme, dispatch } = useContext(ThemeCtx);
  const toggleTheme = () => {
    dispatch({ type: "toggle" });
  }

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const name = await getName();
      const version = await getVersion();
      setAppInfo({ name, version });
    })();
  }, [appInfo])


  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="flex gap-4">
            <h1 className="text-5xl font-bold text-primary ">
              {appInfo.name}
            </h1>
            <button onClick={toggleTheme} className="hover:animate-bounce">
              {theme.value === "cupcake" ? <IconSun size={36} /> : <IconMoonFilled size={36} />}
            </button>
          </div>
          <p className="py-1 italic">Version: {appInfo.version}</p>
          <div className="flex gap-4 my-8">
            <div
              className="tooltip tooltip-bottom tooltip-primary"
              data-tip="Create prerecorded Programs!">
              <button
                className="btn btn-accent"
                onClick={() => router.push("/program")}
              >
                Program Editor
              </button>
            </div>
            <div
              className="tooltip tooltip-bottom tooltip-primary"
              data-tip="Control your live broadcast streams!">
              <button
                className="btn btn-accent"
                onClick={() => router.push("/mixer")}
              >
                Go to Mixer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
