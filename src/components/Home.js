export default function Home() {

    const logout = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    }

    return (
        <div>
            <h1>信息管理系统</h1>
            <button onClick={logout}>退出</button>
        </div>
    );
}