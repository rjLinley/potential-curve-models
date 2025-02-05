import HamburgerMenu from "./HamburgerMenu";

type SidebarProps = {
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
};

function Sidebar({ selectedModel, setSelectedModel }: SidebarProps) {
    return (
        <div className="side-bar">
            <HamburgerMenu
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
            />
        </div>
    );
}

export default Sidebar;
