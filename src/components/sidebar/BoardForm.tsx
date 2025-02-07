import logos from '../../assets/emojis/logos';

interface BoardFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  isFormBoardOpen: boolean;
  setEmoji: (emoji: string) => void;
}

export function BoardForm({ handleSubmit, setEmoji, isFormBoardOpen }: BoardFormProps) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col bg-gray-800 p-4">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        className="border-2 border-gray-500 rounded-full p-1 text-white"
      />

      <label htmlFor="emoji" className="mt-5">
        Emoji
      </label>
      <div
        className="border-2 border-gray-500 rounded-full p-2 bg-no-repeat"
      >
        {logos.map((logo) => (
          <div key={logo} className='flex flex-row justify-center' onClick={() => setEmoji(logo)}>
            <img src={logo} alt={logo} className="w-8 h-8 border-2 border-gray-500 rounded-full hover:border-white hover:border-3" />
          </div>
        ))}
      </div>

      <button type="submit" className="p-2 rounded-full bg-gray-400 mt-4">
        Save
      </button>
    </form>
  );
}
