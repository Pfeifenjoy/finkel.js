Vagrant.configure("2") do |config|
	config.vm.box = "ogarcia/archlinux-x64"

	config.ssh.forward_agent = true
	config.vm.synced_folder ".", "/home/vagrant/conclusion-plugin"

	config.vm.provision "shell",
	privileged: false,
	inline: <<-SHELL
		# Update system
		sudo pacman -Syu --noconfirm

		# Get yaourt
		sudo pacman -S --noconfirm base-devel
		cd /tmp
		curl -O https://aur.archlinux.org/cgit/aur.git/snapshot/package-query.tar.gz
		tar -xvzf package-query.tar.gz
		cd package-query
		makepkg -si --noconfirm
		cd ..
		rm -rf package-query
		curl -O https://aur.archlinux.org/cgit/aur.git/snapshot/yaourt.tar.gz
		tar -xvzf yaourt.tar.gz
		cd yaourt
		makepkg -si --noconfirm
		cd ..
		rm -rf yaourt

		# install dev tools
		yaourt -S --noconfirm yarn nodejs npm

		# install dependencies
		cd /home/vagrant && yarn install
	SHELL
end
