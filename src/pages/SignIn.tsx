
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeClosed, Google } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock authentication - in a real app, this would connect to a backend
    if (email && password) {
      // Store in localStorage that the user has signed in
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: isLogin ? "Signed in successfully" : "Account created successfully",
        description: `Welcome, ${email}!`,
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: "Please enter email and password",
        variant: "destructive",
      });
    }
  };

  const handleGoogleSignIn = () => {
    // Mock Google authentication
    localStorage.setItem("isAuthenticated", "true");
    toast({
      title: "Signed in with Google",
      description: "Welcome!",
    });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md bg-white text-black">
        <CardContent className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-8">TrakWalt</h1>
            <h2 className="text-2xl font-semibold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin
                ? "Fill out the information below in order to access your account."
                : "Fill out the information below to create your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300"
              />
            </div>

            <div className="relative space-y-2">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border border-gray-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeClosed className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            {isLogin && (
              <>
                <div className="relative flex items-center justify-center text-xs">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or sign in with
                  </span>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleGoogleSignIn}
                >
                  <Google className="h-4 w-4" />
                  <span>Continue with Google</span>
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="text-sm font-medium text-purple-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="mt-6">
            <div className="border rounded-md overflow-hidden flex">
              <button
                className={`flex-1 py-3 text-center ${
                  isLogin ? "bg-white font-medium" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
              <button
                className={`flex-1 py-3 text-center ${
                  !isLogin ? "bg-white font-medium" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Create Account
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
