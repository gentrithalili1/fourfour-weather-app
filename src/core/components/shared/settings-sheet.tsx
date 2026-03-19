import { Settings } from "lucide-react";

import { ModeToggle } from "@/core/components/shared/mode-toggle";
import { TempUnitToggle } from "@/core/components/shared/temp-unit-toggle";
import { Button } from "@/core/components/ui/button";
import {
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Sheet,
} from "@/core/components/ui/sheet";

export function SettingsSheet() {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button variant="outline" size="icon">
						<Settings />
					</Button>
				}
			/>
			<SheetContent
				side="right"
				className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh] ">
				<SheetHeader>
					<SheetTitle>Settings</SheetTitle>
					{/* <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription> */}
				</SheetHeader>

				<div className="no-scrollbar overflow-y-auto px-4">
					<ModeToggle />
					<TempUnitToggle />
				</div>
				{/* <SheetFooter>
          <Button type="submit">Save changes</Button>
        </SheetFooter> */}
			</SheetContent>
		</Sheet>
	);
}
