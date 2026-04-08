'use client'
import { APIContaxt } from "@/app/context/context";
import { useContext, useState } from "react";
import { LoginAPIResp } from "@/app/types/apiTypes";
import { useAppDispatch } from "@/app/store/hooks";
import { setAuthStates } from "@/app/store/functions/auth";
import { useRouter } from "next/navigation";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,16}$/;

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter()

  const disp = useAppDispatch()

  const context = useContext(APIContaxt);

  if (!context) {
    throw new Error("Context not found")
  }

  const { apiInstance } = context

  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 6+ chars, include letters & numbers";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const resp = await apiInstance.post<LoginAPIResp>('/auth/login', { email, password },)

        if (!resp) {
          throw new Error("Response not found")
        }

        disp(setAuthStates({
          data: {
            admin: {
              id: resp.data.id,
              autharisedBy: resp.data.superAdmin,
              email: resp.data.email,
              fullName: resp.data.name,
              mobile: resp.data.mobile,
              role: resp.data.role
            },
            selective: {
              contacts: [],
              reports: [],
              users: []
            },
            analytics: {
              loginCount: resp.data.loginCount,
              msgCount: resp.data.msgCount,
              prevLoginCount: resp.data.prevLoginCount,
              prevMsgCount: resp.data.prevMsgCount,
            },
            fullData: {
              report: {
                _id: "",
                contactId: "",
                createdAt: "",
                message: "",
                reportedBy: {
                  _id: "",
                  searchTag: ""
                },
                reportType: "",
                userId: "",
              },
              user: {
                _id: "",
                avatar: "",
                email: "",
                searchTag: "",
                username: "",
                online: false
              }
            },
            contacts: resp.data.contacts,
            reports: resp.data.reports,
            users: resp.data.users,
          }
        }))

        router.replace('/')

      } catch (error) {
        if (error instanceof Error) {
          setErrors({
            email: 'user not found',
            password: ''
          })
        }
      }

    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 text-center mb-6"> Login</h2>
        <div className="mb-4">
          <label className="text-sm text-slate-600 mb-1 block">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-xl outline-none ${errors.email
              ? "border-red-400"
              : "border-slate-300 focus:ring-2 focus:ring-primary"
              }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="text-sm text-slate-600 mb-1 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-xl outline-none ${errors.password
              ? "border-red-400"
              : "border-slate-300 focus:ring-2 focus:ring-primary"
              }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password}
            </p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-black text-white font-medium hover:bg-slate-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};