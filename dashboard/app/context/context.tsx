import { createContext } from "react";
import {APIContextTypes} from '@/app/types/context'

export const APIContaxt = createContext<APIContextTypes|null>(null)