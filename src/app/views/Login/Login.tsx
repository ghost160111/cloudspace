import { Component, ReactNode } from "react";
import { mobx } from "decorators/mobx";
import { title } from "decorators/title";

@title((self) => ({
    title: self.store.localeStore.t("pages.login"),
}))
@mobx
class Login extends Component {
    render(): ReactNode {
        const { fetcher, username, password, setUsername, setPassword, isDisabled, login } = this.store.authStore;
        const { loading, error, errorMessage } = fetcher;

        return (
            <div
                style={{
                    paddingInline: "1rem",
                }}
            >
                <h1>{this.store.localeStore.t("pages.login")}</h1>
                <fieldset
                    style={{
                        display: "flex",
                        flexFlow: "column",
                        width: "100%",
                        padding: "3rem",
                        borderRadius: "1rem",
                    }}
                >
                    {!loading && error && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <form
                        style={{
                            display: "flex",
                            flexFlow: "column",
                            gap: "1rem",
                        }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                        <div style={{ display: "flex", flexFlow: "column" }}>
                            <label htmlFor="username">Email:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>
                        <div style={{ display: "flex", flexFlow: "column" }}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>
                        <button type="submit" disabled={isDisabled}>
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>
                </fieldset>
            </div>
        );
    }
}

export default Login;
