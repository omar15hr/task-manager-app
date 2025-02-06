import logos from '../../assets/emojis/logos';

interface BoardFormProps {
  handleSubmit: (event: React.FormEvent) => void;
}
console.log(logos);

export function BoardForm({ handleSubmit }: BoardFormProps) {
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
      <select
        name="emoji"
        className="border-2 border-gray-500 rounded-full p-2"
      >
        {logos.map((logo) => (
          <option key={logo} value={logo}>
            {logo}
          </option>
        ))}
      </select>

      <button type="submit" className="p-2 rounded-full bg-gray-400 mt-4">
        Save
      </button>
    </form>
  );
}
