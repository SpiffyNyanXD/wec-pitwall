from playwright.sync_api import sync_playwright

def verify_feature():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="/home/jules/verification/video")
        page = context.new_page()

        try:
            # 1. Start on the homepage
            page.goto("http://localhost:8080")
            page.wait_for_timeout(1000)

            # 2. Click the Le Mans nav link
            # The header has desktop and mobile navs, we look for the desktop one
            page.get_by_role("link", name="Le Mans 🏁").first.click()
            page.wait_for_timeout(1500)

            # 3. Take a screenshot of the top of the Le Mans page
            page.screenshot(path="/home/jules/verification/lemans_top.png")

            # 4. Scroll down to show other sections
            page.mouse.wheel(0, 800)
            page.wait_for_timeout(1000)

            page.mouse.wheel(0, 800)
            page.wait_for_timeout(1000)

            page.mouse.wheel(0, 800)
            page.wait_for_timeout(1000)

        except Exception as e:
            print(f"Error: {e}")
        finally:
            context.close()
            browser.close()

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification/video", exist_ok=True)
    verify_feature()
