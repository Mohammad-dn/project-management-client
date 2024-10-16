/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  name: string;
  buttonComponenet?: any;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponenet, isSmallText }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponenet}
    </div>
  );
};

export default Header;
