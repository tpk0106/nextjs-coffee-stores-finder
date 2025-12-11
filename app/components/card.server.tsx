import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardType = {
  name: string;
  imageUrl: string;
  href: string;
};

export default function Card(props: CardType) {
  return (
    <div>
      <Link
        href={props.href}
        className="m-auto rounded-xl border-gray-400 shadow-2xl"
      >
        <div
          className={`glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl`}
        >
          <div className="my-3">
            <h2 className="w-64 text-ellipsis whitespace-nowrap text-xl font-bold m-auto pb-5">
              {props.name}
            </h2>
            <div className="relative w-full h-auto m-auto">
              <Image
                className="rounded-lg shadow-lg m-auto"
                src={props.imageUrl}
                alt={props.name}
                width={260}
                height={160}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQQAAACgCAYAAADq8hJGAAABdklEQVR42u3UQREAAAQAMJKL6DQihscWYtkzFQAnhQAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACABCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAoAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAEQAiAEAAhAEIAhAAIARACIARACIAQACEAQgCEAAhBCIAQACEAQgCEAAgBEAIgBEAIgBAAIQBCAIQACAEQAiAE4JMFlabWsI7DT08AAAAASUVORK5CYII="
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
