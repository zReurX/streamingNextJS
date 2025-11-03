"use client";
import React from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { Button } from "./ui/button";
import Link from "next/link";

function Player({ link }) {
  
  if (!link)
    return (
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl">Contenuto non Disponibile</h1>
        <Button asChild>
          <Link href="/">Torna al Home</Link>
        </Button>
      </div>
    );

  return (
    <MediaPlayer
      className="h-full"
      autoPlay
      title="Sprite Fight"
      onHlsLibLoaded={(detail) => {
        detail.DefaultConfig.xhrSetup = (xhr, url) => {
          if (url.endsWith("storage/enc.key")) {
            url = "https://vixsrc.to/storage/enc.key";
          }
          xhr.open("GET", `/proxy/${encodeURIComponent(url)}`, true);
        };
      }}
      onHlsError={(data) => {
        console.log(data);
      }}
      storage={"player-storage"}
      preferNativeHLS={false}
      src={{ src: link, type: "application/vnd.apple.mpegurl" }}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} colorScheme="dark" />
    </MediaPlayer>
  );
}

export default Player;
