import BudgetHistory from "../components/widgets/budget/BudgetHistory";
import BudgetWidget from "../components/widgets/budget/BudgetWidget";
import ChecklistWidget from "../components/widgets/checklist/ChecklistWidget";
import GoalWidget from "../components/widgets/goal/GoalWidget";
import StatOverview from "../components/widgets/stat/StatOverview";
import StatWidget from "../components/widgets/stat/StatWidget";
import TextWidget from "../components/widgets/TextWidget";
import TopExpenses from "../components/widgets/TopExpenses";
import TransactionList from "../components/widgets/transactions/transaction-list/TransactionList";
import TransactionsWidget from "../components/widgets/transactions/TransactionsWidget";
import ImageWidget from "../components/widgets/ImageWidget"
//component map
export const widgetTypes = {
  stat: StatWidget,
  budget: BudgetWidget,
  text: TextWidget,
  checklist: ChecklistWidget,
  transaction: TransactionsWidget,
  goal: GoalWidget,
  'top expenses': TopExpenses,
  'stat overview': StatOverview,
  'transactions list': TransactionList,
  image: ImageWidget
}