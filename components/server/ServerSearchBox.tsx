'use client';
import * as React from 'react';
import { Search } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '../ui/command';
import { useParams, useRouter } from 'next/navigation';

interface ServerSearchBoxProps {
  data: {
    label: string;
    type: 'channel' | 'member';
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearchBox: React.FC<ServerSearchBoxProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const params = useParams();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: 'channel' | 'member';
  }) => {
    setOpen(false);

    if (type === 'member') {
      return router.push(`/servers/${params.serverId}/conversations/${id}`);
    }

    return router.push(`/servers/${params.serverId}/channels/${id}`);
  };

  return (
    <>
      <button
        className='group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'
        onClick={() => setOpen(true)}
      >
        <Search className='w-4 h-4 text-zinc-500 dark:text-zinc-400' />
        <p className='font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition '>
          Search
        </p>

        <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto'>
          <span className='text-xs font-medium text-zinc-500 dark:text-zinc-400'>
            CTRL
          </span>{' '}
          J
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Search for a channel or a member' />
        <CommandList>
          <CommandEmpty>
            <p className='text-sm text-muted-foreground dark:text-muted-foreground'>
              No results found
            </p>
          </CommandEmpty>

          {data.map(({ data, label, type }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data.map(({ icon, name, id }) => (
                  <CommandItem
                    key={id}
                    onClickCapture={() => onClick({ id, type })}
                  >
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearchBox;
