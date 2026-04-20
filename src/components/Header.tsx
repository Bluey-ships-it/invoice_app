import { useTheme } from "../context/ThemeContext";

export default function Header() {
	const { theme, toggleTheme } = useTheme();

	return (
		<>
			{/* Mobile & Tablet */}
			<header className="lg:hidden sticky top-0 z-50 bg-[#373B53] flex items-center justify-between h-18">
				<div>
					<img src="/images/mobile/logo.svg" alt="logo image" />
				</div>
				<div>
					<div className="flex items-center gap-6 ">
						<button
							onClick={toggleTheme}
							aria-label="Toggle theme"
							className="cursor-pointer"
						>
							<img
								src={
									theme === "dark"
										? "/images/mobile/sun.svg"
										: "/images/mobile/moon.svg"
								}
								alt="theme switch icon"
							/>
						</button>
						<div className="border-l border-[#494E6E] px-6">
							<img src="/images/mobile/user.svg" alt="" />
						</div>
					</div>
				</div>
			</header>

			{/* Large screen — fixed left sidebar */}
			<aside className="hidden lg:flex fixed top-0 left-0 bottom-0 z-50 w-25.75 bg-[#373B53] flex-col justify-between rounded-r-[20px] overflow-hidden">
				<div>
					<img src="/images/desktop/logo.svg" alt="logo image"  className="w-full"/>
				</div>
				<div>
					<div className="flex flex-col items-center gap-6 pb-6">
						<button
							onClick={toggleTheme}
							aria-label="Toggle theme"
							className="cursor-pointer"
						>
							<img
								src={
									theme === "dark"
										? "/images/mobile/sun.svg"
										: "/images/mobile/moon.svg"
								}
								alt="theme switch icon"
							/>
						</button>
						<div className="border-t border-[#494E6E] pt-6 w-full flex justify-center">
							<img src="/images/mobile/user.svg" alt="" />
						</div>
					</div>
				</div>
			</aside>
		</>
	);
}
