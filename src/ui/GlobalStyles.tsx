import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --color-bg: #dedede;
        --color-primary: #1990ff;
        --color-secondary: #ff4d4f;
        --color-base-black: #000;
        --color-base-white: #fff;
        --color-blue-100: #e7f0fe;
        --color-blue-200: #001628;
        --color-grey-100: #e9e9e9;
        --color-grey-200: #fafafa;
        --color-grey-300: #fefefe;
        --color-backdrop: rgba(0, 0, 0, 0.3);
    }

    html {
        font-size: 16px;
    }

    body {
        margin: 0;
        font-family: "Poppins", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.4;
}

    *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font: inherit;
        }

        button {
            cursor: pointer;

            &:disabled {
                cursor: not-allowed;
            }
        }
`;

export default GlobalStyles;
