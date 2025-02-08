import { useState } from "react";
import hamburgerMenu from "../assets/hamburger-icon.svg"

interface HamburgerProps {
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}

const graphNames = ["Guoy Chapman", "Van Der Waals", "Ion Gradients"];

const HamburgerMenu = (props: HamburgerProps) => {
    const { selectedModel, setSelectedModel } = props;
    const [open, setOpen] = useState(false);

    const handleMenuClick = () => {
        setOpen(!open);
    };

    const handleSelectModel = (name: string) => {
        setSelectedModel(name);
    };

    return (
        <div>
            <button onClick={() => handleMenuClick()}>
                <img src={hamburgerMenu} />
            </button>
            {open && (
                <div>
                    <ul className="graph-menu">
                        {graphNames.map((name) => {
                            if (name === selectedModel) {
                                return (
                                    <li
                                        key={name}
                                        className="graph-list-name selected-model"
                                        onClick={() => handleSelectModel(name)}
                                    >
                                        {name}
                                    </li>
                                );
                            } else {
                                return (
                                    <li
                                        key={name}
                                        className="graph-list-name"
                                        onClick={() => handleSelectModel(name)}
                                    >
                                        {name}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
