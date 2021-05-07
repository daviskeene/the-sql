import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({theme}) => theme.background};
    font-family: ${({ theme }) => theme.fonts};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
	color: inherit;
	text-decoration: inherit;
  }

  /* Button */

	button,
	.button {
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
		appearance: none;
		-moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
		-webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
		-ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
		transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
		border-radius: 4px;
		border: 0;
		cursor: pointer;
		display: inline-block;
		font-size: 0.8em;
		font-weight: 500;
		height: 3.5em;
		letter-spacing: 0.25em;
		line-height: 3.5em;
		padding: 0 2em;
        margin: 2rem;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
	}

		button.icon:before,
		.button.icon:before {
			margin-right: 0.5em;
		}

		button.fit,
		.button.fit {
			display: block;
			margin: 0 0 1em 0;
			width: 100%;
		}

		button.small,
		.button.small {
			font-size: 0.6em;
		}

		button.big,
		.button.big {
			min-width: 19em;
			height: 3.75em;
			line-height: 3.75em;
		}

		button.disabled,
		button:disabled,
		.button.disabled,
		.button:disabled {
			-moz-pointer-events: none;
			-webkit-pointer-events: none;
			-ms-pointer-events: none;
			pointer-events: none;
			opacity: 0.25;
		}

	button,
	.button {
		background-color: transparent;
		box-shadow: inset 0 0 0 2px #eaeaea;
		color: #FFFFFF;
	}

		button:hover,
		.button:hover {
			box-shadow: inset 0 0 0 2px white};
			color: white !important;
		}

		button:active,
		.button:active {
			box-shadow: inset 0 0 0 2px ${({theme}) => theme.foundersOrange};
			color: ${({theme}) => theme.foundersOrange} !important;
			background-color: rgba(123, 210, 237, 0.25);
		}

		button.special,
		.button.special {
			box-shadow: none;
			background-color: #ff9600;
			color: #ffffff !important;
		}

			button.special:hover,
			.button.special:hover {
				background-color: #ffb64e;
				color: #ffffff !important;
			}

			button.special:active,
			.button.special:active {
				background-color: #38bbe4;
				color: #ffffff !important;
			}

	@media screen and (max-width: 736px) {

		.button.big {
			font-size: .55rem;
		}

	}
`;

/**
 * Default theme variables
 */
const theme = {
  fonts:
  'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;',
  // text colors
  text: '#232323',
  secondaryText: '#2323237D',
  // backgrounds
  background: '#FFFFFF',
  // palette
  foundersOrange: '#F89620',
  nightSkyOld: '#17182f',
  nightSky: 'rgba(48,27,66,1)',
  darkBlue: '#022C52',
  darkBlueGradient: 'linear-gradient(180deg, ${({theme}) => theme.darkBlue} 0%,${({theme}) => theme.darkBlue} 35%,${({theme}) => theme.darkBlue} 250%)',
};

export default GlobalStyles;
export { theme };